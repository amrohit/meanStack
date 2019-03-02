import { Post } from "./../post.model";
import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { PostsService } from "../posts.service";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading: boolean = false;
  totalPosts = 10;
  postsPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];
  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdatedListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }
  onChangedPage(pageData: PageEvent) {
    console.log(pageData);
  }
  onDelete(id: string) {
    this.postsService.deletePost(id);
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
