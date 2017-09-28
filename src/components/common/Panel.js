/**
 *
 * Created by on 2017-06-28.
 */
import React from "react";

export default function Panel({children, className}) {
    return (
        <div className={"fgw-panel " + (className || '')}>
            {children}
        </div>
    );
}

export function PanelHeader({children, className}) {
    return (
        <div className={"fgw-panel-header " + (className || '')}>
            {children}
        </div>
    );
}

export function PanelBody({children, className}) {
    return (
        <div className={"fgw-panel-body " + (className || '')}>
            {children}
        </div>
    );
}
