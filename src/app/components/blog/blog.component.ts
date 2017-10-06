import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Subscription} from 'rxjs/Subscription';
import {Blog} from '../../interfaces/blog';
import {Card} from '../../interfaces/card';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

  waiting = true;
  failed = false;
  cardSize = 0;
  mediaAlias: string;

  private blogSubscription: Subscription;
  private mediaSubscription: Subscription;

  blogList: Blog[];
  private videoList: string[] = [
    'ogv', 'ogm', 'ogg', 'mp4', 'webm', 'gifv'
  ];

  private imgList: string[] = [
    'png', 'bmp', 'jpeg', 'jpg', 'gif'
  ];

  constructor(private firebaseService: FirebaseService,  private observableMedia: ObservableMedia) {
    this.mediaSubscription = this.observableMedia.subscribe((mediaAlias: MediaChange) => {
      this.mediaAlias = mediaAlias.mqAlias;
      this.setContentSize();
    });
  }

  ngOnInit() {
    // call this here because the subscription to ObservableMedia does fire on load sometimes????
    this.setContentSize();

    this.blogSubscription = this.firebaseService.getBlogPostsFromFB().subscribe(blogList => {
      this.blogList = this.sortBlogArrayByIdDesc(this.parseCardArrayToBlogArray(blogList));
      this.waiting = false;
      this.failed = false;
    }, err => {
      this.failed = true;
    });
  }

  private setContentSize(): void {
    if (this.observableMedia.isActive('xs')) {
      this.cardSize = 0;
    } else if (this.observableMedia.isActive('sm')) {
      this.cardSize = 1;
    }  else if (this.observableMedia.isActive('md')) {
      this.cardSize = 2;
    } else {
      this.cardSize = 3;
    }
  }

  ngOnDestroy() {
    if (this.blogSubscription) {
      this.blogSubscription.unsubscribe();
    }
    if (this.mediaSubscription) {
      this.mediaSubscription.unsubscribe();
    }
  }

  private sortBlogArrayByIdAsc(blogs: Blog[]): Blog[] {
    return blogs.sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
    });
  }

  private sortBlogArrayByIdDesc(blogs: Blog[]): Blog[] {
    return blogs.sort((a, b) => {
      if (a.id < b.id) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
    });
  }

  private parseCardArrayToBlogArray(cards: Card[]): Blog[] {
    const blogList: Blog[] = [];

    for (const card of cards) {
      const blog: Blog = <Blog>{
        id: card.id,
        title: card.title,
        subtitle: card.subtitle,
        content: card.content,
        footer: card.footer,
        image: card.image,
        hasVideo: false,
        videoType: ''
      };
      if (blog.image.length > 0) {
        const extension: string = card.image.substr(card.image.lastIndexOf('.') + 1).toLowerCase();
        let allowed = false;
        for (const type of this.videoList) {
          if (extension === type) {
            blog.hasVideo = true;
            if (type === 'ogv' || type === 'ogm') {
              blog.videoType = 'ogg';
            } else {
              blog.videoType = type;
            }
            allowed = true;
          }
        }
        if (allowed === false) {
          for (const type of this.imgList) {
            if (extension === type) {
              allowed = true;
            }
          }
        }
        if (allowed === false) {
          blog.image = '';
        }
      }

      blogList.push(blog);

    }
    return blogList;
  }

}
