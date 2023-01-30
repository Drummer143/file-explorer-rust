import { useEffect, useState } from 'react';
import { appWindow } from '@tauri-apps/api/window';
import { useTranslation } from 'react-i18next';

import GoogleIcon from '../GoogleIcon/GoogleIcon';

import styles from './FrameWindowControlButtons.module.scss';

import { event } from '@tauri-apps/api'

type Props = {
    isFullscreen: boolean;
    setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
};

function FrameWindowControlButtons({ isFullscreen, setIsFullscreen }: Props) {
    const { t } = useTranslation();

    const handleMinimize = () => appWindow.minimize();

    const handleWindowViewButtonClick = () => {
        if (isFullscreen) {
            appWindow.setFullscreen(false);
            appWindow.setResizable(true);
        } else {
            appWindow.setFullscreen(true);
            appWindow.setResizable(false);
        }
        setIsFullscreen(prev => !prev);
    };

    useEffect(() => {
        appWindow.isFullscreen().then(res => setIsFullscreen(res));
    }, [])

    const handleClose = () => appWindow.close();

    return (
        <div
            className={'absolute flex gap-1 p-1 rounded-bl-lg right-0 top-0 z-[100] bg-[var(--menu-dark)] transition-transform'
                .concat(isFullscreen ? ' -translate-y-[100%] hover:translate-y-0' : '')
                .concat(' ', styles.wrapper)}
        >
            <button onClick={() => {
                event.emit('ping', 'message');
            }}>
                emit
            </button>
            <button
                title={t('windowControlButtons.minimize')}
                onClick={handleMinimize}
                className={"grid rounded-lg place-items-center cursor-pointer transition w-9 h-9"
                    .concat(' hover:bg-[var(--top-grey-dark)]')}
            >
                <GoogleIcon iconName="minimize" size={34} />
            </button>

            <button
                title={t(`windowControlButtons.${isFullscreen ? 'restoreToWindow' : 'maximize'}`)}
                onClick={handleWindowViewButtonClick}
                className={"grid rounded-lg place-items-center cursor-pointer transition w-9 h-9"
                    .concat(' hover:bg-[var(--top-grey-dark)]')}
            >
                <GoogleIcon iconName={isFullscreen ? 'fullscreen_exit' : 'fullscreen'} size={34} />
            </button>

            <button
                title={t('windowControlButtons.close')}
                onClick={handleClose}
                className={"grid rounded-lg place-items-center cursor-pointer transition w-9 h-9"
                    .concat(' hover:bg-[var(--top-grey-dark)]')}
            >
                <GoogleIcon iconName="close" size={34} />
            </button>
        </div >
    );
}

export default FrameWindowControlButtons;
