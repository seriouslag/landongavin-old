import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Subscription} from 'rxjs/Subscription';
import {Blog} from '../../interfaces/blog';
import {Card} from '../../interfaces/card';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

  private blogSubscription: Subscription;
  blogList: Blog[];
  private videoList: string[] = [
    'ogg', 'mp4'
  ];

  isVideo: Boolean = true;
  videoType = 'mp4';

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.blogSubscription = this.firebaseService.getBlogPostsFromFB().subscribe(blogList => {
      this.blogList = this.parseCardArrayToBlogArray(blogList);
    });
  }

  ngOnDestroy() {
    this.blogSubscription.unsubscribe();
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
      for (const type of this.videoList) {
        if (card.image.substr(card.image.length - 3).toLocaleLowerCase() === type) {
          blog.hasVideo = true;
          blog.videoType = type;
        }
      }

      blogList.push(blog);

    }
    return blogList;
  }



}
