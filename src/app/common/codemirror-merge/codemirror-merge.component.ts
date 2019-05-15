import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  ViewChild,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MergeView } from 'codemirror';


@Component({
  selector: 'sn-codemirror-merge',
  templateUrl: './codemirror-merge.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodemirrorMergeComponent),
      multi: true,
    },
  ],
})
export class CodemirrorMergeComponent implements AfterViewInit {


  /*
  angular lifecycle:
    constructor
    ngOnChanges
    ngOnInit
    ngDoCheck
      ngAfterContentInit
      ngAfterContentChecked
      ngAfterViewInit
      ngAfterViewChecked
    ngOnDestroy

    @Input 属于ngOnChanges，ngAfterViewInit在@Input之后，所以得在@Input被触发时，就执行init()，
    不在constructor中执行，是因为 ViewChild 的ref 是在constructor之后再初始化的…… 
    可能是因为我对angular不够熟悉，应该是有更好的方式才对。

   */


  @Input() set mode(value: any) {
    if (value) {
      this._mode = value;
    }
    if (this.codeMirror) {
      this.codeMirror.rightOriginal().setOption('mode', value);
      this.codeMirror.editor().setOption('mode', value);
    }
  }
  @Input() set value1(value: string) {
    if (value) {
      this.value = value;
    }
    if (this.codeMirror) {
      this.codeMirror.editor().setValue(value);
    }
  }
  @Input() set value2(value: string) {
    if (value) {
      this.orig = value;
    }
    if (this.codeMirror) {
      this.codeMirror.rightOriginal().setValue(value);
    }
  }
  @ViewChild('ref') ref: ElementRef;
  codeMirror: MergeView.MergeViewEditor;
  value = '';
  orig = '';
  _mode = 'javascript';

  constructor(private _ngZone: NgZone) { }
  ngAfterViewInit() {
    if (this.codeMirror) {
      return;
    }
    this.init();
  }
  private init() {
    if (!this.ref) {
      return;
    }
    this._ngZone.runOutsideAngular(() => {
      this.codeMirror = MergeView(this.ref.nativeElement, {
        value: this.value, orig: this.orig, allowEditingOriginals: false, revertButtons: false, lineNumbers: true, mode: this._mode, collapseIdentical: true
      });
    });
  }

}
