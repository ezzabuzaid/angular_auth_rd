import { InjectionToken } from '@angular/core';
import { AsyncStorage } from '@ezzabuzaid/document-storage';

export interface IRequestOptions {
    /**
     * Weather if the request should prefixed the request url with the default
     */
    DEFAULT_URL: boolean;
    /**
     * Weather to show response message in a snackbar
     */
    SNACKBAR: boolean;
    /**
     * Indicates if the progress bar should be shown for the request latency
     */
    PROGRESS_BAR: boolean;
    /**
     * Special progress to show when using form container
     *
     * FYI, the progress bae will be shown in all form container in the same view although the another form didn't ask to
     */
    FORM_PROGRESS_BAR: boolean;
    /**
     * Returns the whole resoponse
     *
     * the default is to return only the data property from the response
     */
    FULL_RESPONSE: boolean;
}
