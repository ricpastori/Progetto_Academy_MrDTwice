import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

import { ResponsiveImage } from '../../component/responsive-image/responsive-image';

type PhosphorIconClass = `ph ph-${string}`;

interface AboutStat {
  readonly iconClass: PhosphorIconClass;
  readonly value: string;
  readonly label: string;
}

interface AboutValue {
  readonly iconClass: PhosphorIconClass;
  readonly title: string;
  readonly description: string;
}

interface TeamMember {
  readonly avatarUrl: string;
  readonly name: string;
  readonly role: string;
  readonly githubUrl: string;
  readonly linkedinUrl: string;
}

@Component({
  selector: 'app-about-page',
  imports: [CardModule, ResponsiveImage],
  templateUrl: './about-page.html',
  styleUrl: './about-page.css',
})
export class AboutPage {
  // Dati statici della pagina: il template resta pulito e il contenuto si aggiorna da qui.
  protected readonly stats: readonly AboutStat[] = [
    { iconClass: 'ph ph-map-pin', value: '10,000+', label: 'Luoghi recensiti' },
    { iconClass: 'ph ph-globe-hemisphere-west', value: '20', label: 'Regioni italiane' },
    { iconClass: 'ph ph-chat-circle-text', value: '50k+', label: 'Recensioni pubblicate' },
    { iconClass: 'ph ph-rocket-launch', value: '∞', label: 'Avventure da vivere' },
  ];

  protected readonly values: readonly AboutValue[] = [
    {
      iconClass: 'ph ph-rocket-launch',
      title: 'Esplora ovunque',
      description:
        'Dalla Grande Barriera Corallina alle Dolomiti: nessun luogo e troppo lontano per essere scoperto e raccontato.',
    },
    {
      iconClass: 'ph ph-camera',
      title: 'Fotografa tutto',
      description:
        'Ogni posto speciale merita di essere immortalato. Mr D Twice documenta la natura nella sua forma piu autentica.',
    },
    {
      iconClass: 'ph ph-chat-circle-text',
      title: 'Racconta la storia',
      description:
        "Recensioni dettagliate, impressioni oneste, consigli da chi c'e stato. Perche ogni luogo ha una storia da raccontare.",
    },
    {
      iconClass: 'ph ph-shield-check',
      title: 'Proteggi il pianeta',
      description:
        'Scoprire la bellezza comporta responsabilita. Incoraggiamo i viaggiatori a rispettare e preservare i luoghi per il futuro.',
    },
  ];

  protected readonly team: readonly TeamMember[] = [
    {
      avatarUrl: '/images/origin/about/avatar_davide_braghi.png',
      name: 'Davide Braghi',
      role: 'Co-founder & Explorer',
      githubUrl: 'https://github.com/Dade1991',
      linkedinUrl: 'https://www.linkedin.com/in/davide-braghi-1991-pc/',
    },
    {
      avatarUrl: '/images/origin/about/avatar_davide_donnarumma.png',
      name: 'Davide Donnarumma',
      role: 'Lead Developer',
      githubUrl: 'https://github.com/Davide-Donnarumma',
      linkedinUrl: 'https://www.linkedin.com/in/davide-donnarumma-5403611bb/',
    },
    {
      avatarUrl: '/images/origin/about/avatar_marianna_masala.png',
      name: 'Marianna Masala',
      role: 'Creative Director',
      githubUrl: 'https://github.com/Marienne-ma',
      linkedinUrl: 'https://www.linkedin.com/in/marianna-masala-a06b74292/',
    },
    {
      avatarUrl: '/images/origin/about/avatar_riccardo_pastori.png',
      name: 'Riccardo Pastori',
      role: 'UX Engineer',
      githubUrl: 'https://github.com/ricpastori',
      linkedinUrl: 'https://www.linkedin.com/in/riccardo-pastori/',
    },
  ];
}
