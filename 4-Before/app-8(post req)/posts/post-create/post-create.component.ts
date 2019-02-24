import { PostsService } from "./../posts.service";
import { Post } from "./../post.model";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  enteredContent = "";
  enteredTitle = "";
  //@Output() postCreated = new EventEmitter<Post>();
  constructor(private postsService: PostsService) {}
  ngOnInit() {}
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // const post = {
    //   title: form.value.title,
    //   content: form.value.content
    // };
    // this.postCreated.emit(post);
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
