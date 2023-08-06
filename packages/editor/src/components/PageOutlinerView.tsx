import React, { PropsWithChildren } from 'react';
import { selectPanelState } from '../redux/panelStateEnhancer';
import { useAppDispatch, useAppSelector } from '../redux/stateHooks';
import { createPageOutlinerPanelState } from '../slices/panelPageOutlinerSlice';
import { ViewProps, ViewTypes } from '../types';
import { useBindPanelState } from '../utils/panelManager';
import PanelBody from './PanelBody';
import PageOutlinerList from './PageOutlinerList';
import { PanelHeaderDiv, PanelHeadingH } from '../styles/common';

const PageOutlinerView = (viewProps: PropsWithChildren<ViewProps>) => {
    const { panelId } = viewProps;

    useBindPanelState(
        panelId,
        createPageOutlinerPanelState,
        ViewTypes.PageOutliner,
    );

    return (
        <PanelBody viewProps={viewProps}>
            <PanelHeaderDiv>
                <PanelHeadingH>Outliner</PanelHeadingH>
            </PanelHeaderDiv>
            <PageOutlinerList panelId={panelId} />
        </PanelBody>
    );
}

export default PageOutlinerView;