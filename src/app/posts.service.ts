
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'}) 
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();


    constructor(private http: HttpClient) {}

    getPosts() {
        this.http.get<{message: string, posts: any }>('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
            return postData.posts.map(post => {
                return {
                    name: post.name,
                    id: post._id
                };
                });
            }))
        .subscribe((transformedposts) => {
            this.posts = transformedposts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(name: string) {
        const post: Post = {id: null, name: name};
        this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
        .subscribe((responseData) => {
            console.log(responseData.message);
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        });
    }
}