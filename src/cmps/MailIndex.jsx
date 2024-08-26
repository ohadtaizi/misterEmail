import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { EmailFolderList } from './EmailFolderList';

export function MailIndex() {
    const location = useLocation();

    return (
        <div>
            <Switch>
                <Route path="/email/:folder">
                    <EmailFolderList />
                </Route>
            </Switch>
        </div>
    );
}
