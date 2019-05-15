import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import 'codemirror/mode/javascript/javascript'; 
import 'codemirror/mode/xml/xml';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/merge/merge';
import 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import { PrismHighlightDirective } from './directive/prism-highlight.directive';
import { CodemirrorComponent } from './codemirror/codemirror.component';
import { CodemirrorMergeComponent } from './codemirror-merge/codemirror-merge.component';



@NgModule({
  declarations: [
    PrismHighlightDirective,
    CodemirrorComponent,
    CodemirrorMergeComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PrismHighlightDirective,
    CodemirrorComponent,
    CodemirrorMergeComponent
  ]
})
export class CommonsModule { }
