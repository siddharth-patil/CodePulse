import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogPostService } from '../services/blog-post-service';
import { AddBlogPostRequest } from '../models/blogpost.model';
import { Router } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-add-blogpost',
  imports: [ReactiveFormsModule, MarkdownComponent],
  templateUrl: './add-blogpost.html',
  styleUrl: './add-blogpost.css',
})
export class AddBlogpost {

  blogPostService = inject(BlogPostService);
  router = inject(Router);

  addBlogPostForm = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required,Validators.minLength(10) ,Validators.maxLength(100)]
    }),
    shortDescription: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required,Validators.minLength(10) ,Validators.maxLength(300)]
    }),
    content: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required,Validators.minLength(20)]
    }),
    featuredImageUrl: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required,Validators.maxLength(200)]
    }),
    urlHandle: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required,Validators.maxLength(200)]
    }),
    publishedDate: new FormControl<string>(new Date().toISOString().split('T')[0], {
      nonNullable: true,
      validators: [Validators.required]
    }),
    author: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required ,Validators.maxLength(100)]
    }),
    isVisible: new FormControl<boolean>(true, {
      nonNullable: true,
      validators: [Validators.required]
    }),
  });

  onSubmit(){

    const formRawValue = this.addBlogPostForm.getRawValue();

    const requestDto: AddBlogPostRequest = {
      title: formRawValue.title,
      shortDescription: formRawValue.shortDescription,
      content: formRawValue.content,
      featuredImageUrl: formRawValue.featuredImageUrl,
      isVisible: formRawValue.isVisible,
      urlHandle: formRawValue.urlHandle,
      author: formRawValue.author,
      publishedDate: new Date(formRawValue.publishedDate)
    }

    this.blogPostService.createBlogPost(requestDto).subscribe({
      next:(response) =>{
        console.log(response);

        //navigate to the blog post list page
        this.router.navigate(['/admin/blogposts'])
        
      },
      error: () => {
        console.error('SOmething went wrong');
        
      }
    });    
    
  }
}
