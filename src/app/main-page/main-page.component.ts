import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LanguageTable, Language } from './../../models/languages/languages';
import { CodeEditorComponent } from './../code-editor/code-editor.component';
import { ServerHandlerService } from './../../services';
import {
    DEFAULT_INIT_EDITOR_OPTIONS,
    DEFAULT_SUPPORTED_EDITOR_THEMES,
    DEFAULT_RUN_ERROR_MESSAGE
} from './default-options';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
}) export class MainPageComponent implements OnInit {

    public activatedTheme: string;
    // indicate if the initial languages api request failed or not.
    public cantReachServer = false;
    // options to init the editor with.
    public initEditorOptions = DEFAULT_INIT_EDITOR_OPTIONS;
    // array of the supported themes names.
    public supportedThemes = DEFAULT_SUPPORTED_EDITOR_THEMES;
    // code editor component reference
    @ViewChild(CodeEditorComponent) codeEditor: CodeEditorComponent;
    // languages select element reference.
    @ViewChild('languagesSelect') languagesSelect: ElementRef;
    // array of the supported languages, to simplify the usage in the component code
    private languagesArray: Language[] = [];
    // observable of the supported languages.
    public languagesArray$: Observable<Language[]>;
    // observable of the run request output.
    public output$: Observable<string>;

    constructor(private handler: ServerHandlerService) { }

    ngOnInit() {
        this.languagesArray$ = this.pipeSupportedLanguages();
        this.activatedTheme = this.initEditorOptions.theme;
    }

    // #region - private
    private pipeSupportedLanguages() {
        return this.handler.getAllSupportedLangs()
            .pipe(
                // reduce the incoming table to languages array.
                map((languages: LanguageTable) => {
                    console.log(languages);
                    return languages.reduce<Language[]>((langsArray, entry) => {
                        return langsArray.concat(entry[1]);
                    }, []);
                }),
                // store the array in a member.
                tap((languages: Language[]) => this.languagesArray = languages ),
                // console log any error and returning an empty array.
                catchError((err) => {
                    console.log(err);
                    this.cantReachServer = true;
                    this.languagesArray = [];
                    return of(this.languagesArray);
                })
            );
    }
    // #end region

    // #region - public
    public onClearContent() { this.codeEditor.setContent(''); }

    public onBeautifyContent() { this.codeEditor.beautifyContent(); }

    public onRunContent() {
        const code = this.codeEditor.getContent();
        if (this.languagesSelect && code && code.length > 0) {
            const languagesSelectElement = this.languagesSelect.nativeElement as HTMLSelectElement;
            const index = languagesSelectElement.selectedIndex;
            const language = this.languagesArray[index];
            this.output$ = this.handler.postCodeToRun(code, {
                id: language.lang, version: language.version
            }).pipe(
                // returning the output content.
                map((response: RunResult) => response.output ),
                // console log any error and returning an error message.
                catchError((err) => {
                    console.log(err);
                    return of(DEFAULT_RUN_ERROR_MESSAGE);
                })
            );
        }
    }

    public onChangeTheme(theme: string) {
        if (this.supportedThemes.includes(theme)) {
            this.codeEditor.setEditorTheme(theme);
        }
    }

    public onChangeLanguageMode(event: any) {
        const selectedIndex = event.target.selectedIndex;
        const language = this.languagesArray[selectedIndex];
        const langMode = language.lang;
        this.codeEditor.setLanguageMode(langMode);
    }
    // #end region
}

interface RunResult {
    output: string;
    statusCode: number;
    memory: string;
    cpuTime: string;
}