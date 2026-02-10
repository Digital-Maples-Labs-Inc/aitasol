/**
 * Settings Service
 * Handles global system settings like popup configuration
 */

import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface PopupSettings {
    imageUrl: string;
    linkUrl: string;
    isActive: boolean;
    updatedBy?: string;
    updatedAt?: Date;
}

const SETTINGS_COLLECTION = 'settings';
const POPUP_DOC_ID = 'popup-advert';

/**
 * Get popup settings
 */
export const getPopupSettings = async (): Promise<PopupSettings | null> => {
    try {
        const docRef = doc(db, SETTINGS_COLLECTION, POPUP_DOC_ID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                imageUrl: data.imageUrl || '',
                linkUrl: data.linkUrl || '',
                isActive: data.isActive || false,
                updatedBy: data.updatedBy,
                updatedAt: data.updatedAt?.toDate(),
            };
        }

        // Return default settings if document doesn't exist
        return {
            imageUrl: '',
            linkUrl: '',
            isActive: false,
        };
    } catch (error) {
        console.error('Error getting popup settings:', error);
        throw error;
    }
};

/**
 * Save popup settings
 */
export const savePopupSettings = async (settings: PopupSettings): Promise<void> => {
    try {
        const docRef = doc(db, SETTINGS_COLLECTION, POPUP_DOC_ID);

        const data: Record<string, any> = {
            ...settings,
            updatedAt: serverTimestamp(),
        };

        // Remove undefined fields
        Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);

        // Check if document exists
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            await updateDoc(docRef, data);
        } else {
            await setDoc(docRef, data);
        }
    } catch (error) {
        console.error('Error saving popup settings:', error);
        throw error;
    }
};
