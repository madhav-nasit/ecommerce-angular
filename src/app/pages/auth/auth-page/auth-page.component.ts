import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';

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
        src: 'assets/images/headband.png', // Main image source
        srcSet: 'assets/images/headband@2x.png 2x, assets/images/headband@3x.png 3x',
      };
    } else {
      this.imageAssets = {
        src: 'assets/images/iphone.png', // Main image source
        srcSet: 'assets/images/iphone@2x.png 2x, assets/images/iphone@3x.png 3x',
      };
    }
  }
}
