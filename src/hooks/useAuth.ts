'use client';
import { auth } from '@/firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

export default function useAuth() {
    const [user, setUser] = useState<any>(auth.currentUser);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        const unsub = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsLoading(false);
        });
        return () => unsub();
    }, []);

    return { user, isLoading };
}
