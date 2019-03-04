import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();
  constructor(private http: HttpClient, private router: Router) {}
  getPosts(postPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "http://localhost:3000/api/posts" + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostsData => {
        console.log(transformedPostsData);
        this.posts = transformedPostsData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostsData.maxPosts
        });
      });
  }

  getPostUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    // return { ...this.posts.find(p => p.id == id) };
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
    }>("http://localhost:3000/api/posts/" + id);
  }
  addPost(title: string, content: string, image: File) {
    // const post: Post = { id: null, title: title, content: content };
    //instead of sending json, we will send form data
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http
      .post<{ message: string; post: Post }>(
        "http://localhost:3000/api/posts",
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }
  updatePost(id: string, title: string, content: string, image: File | string) {
    // const post: Post = {
    //   id: id,
    //   title: title,
    //   content: content,
    //   imagePath: null
    // };
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      };
    }
    this.http
      .put("http://localhost:3000/api/posts/" + id, postData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(["/"]);
      });
  }
  deletePost(postId: string) {
    return this.http.delete("http://localhost:3000/api/posts/" + postId);
  }
}
