import { Component, computed, input, output } from '@angular/core';

type ImageDecoding = 'async' | 'sync' | 'auto';
type ImageFetchPriority = 'high' | 'low' | 'auto';
type ImageFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
type ImageLoading = 'eager' | 'lazy';
type ResponsiveImageSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

// Riconosce URL esterni come https://... per non riscriverli come asset locali.
const absoluteUrlPattern = /^[a-z][a-z0-9+.-]*:\/\//i;
const imageExtensionPattern = /\.(?:jpe?g|png|webp)$/i;
const imageRoot = '/images/';
const originRoot = '/images/origin/';
const generatedRoot = '/images/generated/';
// Deve rimanere allineato a scripts/optimize-images.mjs.
const generatedWidths = [320, 480, 768, 1024, 1440, 1920] as const;
const sizePresets = {
  xs: '320px',
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1440px',
  full: '100vw',
} as const satisfies Record<ResponsiveImageSize, string>;

@Component({
  selector: 'app-responsive-image',
  templateUrl: './responsive-image.html',
  styleUrl: './responsive-image.css',
})
export class ResponsiveImage {
  // src accetta sia percorsi completi sia nomi relativi dentro /images.
  // Esempi validi: "/images/origin/regions/toscana.jpg", "images/regions/toscana.jpg", "regions/toscana.jpg".
  readonly src = input<string | null>(null);
  readonly alt = input('');
  // size sceglie quanto spazio l'immagine dovrebbe occupare: il componente lo traduce nell'attributo sizes.
  readonly size = input<ResponsiveImageSize>('full');
  readonly loading = input<ImageLoading>('lazy');
  readonly decoding = input<ImageDecoding>('async');
  readonly fetchPriority = input<ImageFetchPriority | null>(null);
  // fill serve quando il componente deve comportarsi come un'immagine a tutta altezza nel contenitore.
  readonly fill = input(false);
  readonly fit = input<ImageFit>('cover');

  // Espone l'errore dell'<img> al componente padre, che può decidere un fallback.
  readonly imageError = output<Event>();

  // Normalizziamo una sola volta il path sorgente, poi lo usiamo sia per <img> sia per <source>.
  protected readonly resolvedSrc = computed(() => normalizePublicImagePath(this.src()) ?? '');
  protected readonly webpSrcSet = computed(() => buildWebpSrcSet(this.resolvedSrc()));
  protected readonly resolvedSizes = computed(() => sizePresets[this.size()]);

  protected emitImageError(event: Event): void {
    this.imageError.emit(event);
  }
}

function buildWebpSrcSet(src: string): string {
  if (!canUseGeneratedVersions(src)) {
    return '';
  }

  const extension = src.match(imageExtensionPattern)?.[0] ?? '';
  // Da /images/origin/regions/toscana.jpg otteniamo regions/toscana.
  const imageName = src.slice(originRoot.length, -extension.length);

  // Un solo <source> basta: le diverse risoluzioni sono tutte dentro questo srcset.
  return generatedWidths
    .map((width) => `${generatedRoot}${imageName}-${width}w.webp ${width}w`)
    .join(', ');
}

function canUseGeneratedVersions(src: string): boolean {
  // Generiamo <source> WebP solo per raster locali già processati dallo script.
  // SVG, URL esterni e immagini già dentro /generated restano normali <img>.
  return (
    src.startsWith(imageRoot) &&
    src.startsWith(originRoot) &&
    !src.startsWith(generatedRoot) &&
    imageExtensionPattern.test(src)
  );
}

function normalizePublicImagePath(src: string | null | undefined): string | null {
  const value = src?.trim();

  if (!value) {
    return null;
  }

  if (absoluteUrlPattern.test(value)) {
    return value;
  }

  if (value.startsWith(originRoot) || value.startsWith(generatedRoot)) {
    return value;
  }

  if (value.startsWith(imageRoot)) {
    return `${originRoot}${value.slice(imageRoot.length)}`;
  }

  // Accetta sia "regions/toscana.jpg" sia "images/regions/toscana.jpg".
  return value.startsWith('images/')
    ? `${originRoot}${value.slice('images/'.length)}`
    : `${originRoot}${value}`;
}
