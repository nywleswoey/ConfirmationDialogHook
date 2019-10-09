import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import { SampleComponent } from "./SampleComponent";
import { ConfirmationServiceProvider } from "./ConfirmationService";

ReactDOM.render(
  <ConfirmationServiceProvider>
    <SampleComponent />
  </ConfirmationServiceProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
