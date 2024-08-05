import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { strings } from '../../../constants';
import { icons } from '../../../../assets/images';
import { svg } from '../../../../assets/svgs';

interface ImageAssets {
  src: string;
  srcSet?: string;
}

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
})
export class AuthPageComponent implements OnInit {
  @Input() className: string = '';
  imageAssets?: ImageAssets;
  strings = strings.common;
  svgPaths = svg;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Listen to route changes to dynamically update the image
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateImage();
      }
    });

    // Initial image update on component initialization
    this.updateImage();
  }

  private updateImage() {
    const currentRoute = this.route.snapshot.firstChild?.routeConfig?.path;

    if (currentRoute === 'signup') {
      this.imageAssets = {
        src: icons.headband, // Main image source
        srcSet: `${icons.headband2x} 2x, ${icons.headband3x} 3x`,
      };
    } else {
      this.imageAssets = {
        src: icons.iphone, // Main image source
        srcSet: `${icons.iphone2x} 2x, ${icons.iphone3x} 3x`,
      };
    }
  }
}
