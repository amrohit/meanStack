import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit {
  // posts = [
  //   {
  //     title: "First Post",
  //     content: "This is the first post'content"
  //   },
  //   {
  //     title: "First Post",
  //     content: "This is the second post'content"
  //   },
  //   {
  //     title: "First Post",
  //     content: "This is the third post'content"
  //   }
  // ];
  @Input() posts = [];
  constructor() {}

  ngOnInit() {}
}
