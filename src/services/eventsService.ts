/**
 * Events Service
 * Handles CRUD operations for events in Firestore
 */

import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp,
    Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface Event {
    id?: string;
    title: string;
    category?: string; // e.g. "Workshop", "Youth", "Community"
    date: Date;
    description: string;
    imageUrl?: string;
    linkUrl?: string;
    location?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const EVENTS_COLLECTION = 'events';

/**
 * Get all events (ordered by date)
 */
export const getEvents = async (): Promise<Event[]> => {
    try {
        const eventsRef = collection(db, EVENTS_COLLECTION);
        const q = query(eventsRef, orderBy('date', 'asc'));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                category: data.category || 'Event',
                date: data.date?.toDate(),
                description: data.description,
                imageUrl: data.imageUrl,
                linkUrl: data.linkUrl,
                location: data.location,
                createdAt: data.createdAt?.toDate(),
                updatedAt: data.updatedAt?.toDate(),
            } as Event;
        });
    } catch (error) {
        console.error('Error getting events:', error);
        throw error;
    }
};

/**
 * Get upcoming events
 */
export const getUpcomingEvents = async (limitCount: number = 3): Promise<Event[]> => {
    try {
        const eventsRef = collection(db, EVENTS_COLLECTION);
        // Filter for events in the future (or today)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const q = query(
            eventsRef,
            where('date', '>=', Timestamp.fromDate(today)),
            orderBy('date', 'asc'),
            limit(limitCount)
        );

        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                category: data.category || 'Event',
                date: data.date?.toDate(),
                description: data.description,
                imageUrl: data.imageUrl,
                linkUrl: data.linkUrl,
                location: data.location,
                createdAt: data.createdAt?.toDate(),
                updatedAt: data.updatedAt?.toDate(),
            } as Event;
        });
    } catch (error) {
        console.error('Error getting upcoming events:', error);
        throw error;
    }
};

/**
 * Get single event by ID
 */
export const getEventById = async (eventId: string): Promise<Event | null> => {
    try {
        const docRef = doc(db, EVENTS_COLLECTION, eventId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                title: data.title,
                category: data.category || 'Event',
                date: data.date?.toDate(),
                description: data.description,
                imageUrl: data.imageUrl,
                linkUrl: data.linkUrl,
                location: data.location,
                createdAt: data.createdAt?.toDate(),
                updatedAt: data.updatedAt?.toDate(),
            } as Event;
        }
        return null;
    } catch (error) {
        console.error('Error getting event:', error);
        throw error;
    }
};

/**
 * Create new event
 */
export const createEvent = async (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    try {
        const newDocRef = doc(collection(db, EVENTS_COLLECTION));

        const eventData = {
            ...event,
            category: event.category || 'Event',
            date: Timestamp.fromDate(event.date),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };

        await setDoc(newDocRef, eventData);
        return newDocRef.id;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};

/**
 * Update existing event
 */
export const updateEvent = async (eventId: string, event: Partial<Event>): Promise<void> => {
    try {
        const docRef = doc(db, EVENTS_COLLECTION, eventId);

        const eventData: any = {
            ...event,
            updatedAt: serverTimestamp(),
        };

        // Convert Date objects to Timestamps if present
        if (event.date) {
            eventData.date = Timestamp.fromDate(event.date);
        }

        // Remove fields that shouldn't be updated directly
        delete eventData.id;
        delete eventData.createdAt;

        await updateDoc(docRef, eventData);
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
};

/**
 * Delete event
 */
export const deleteEvent = async (eventId: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, EVENTS_COLLECTION, eventId));
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
};
