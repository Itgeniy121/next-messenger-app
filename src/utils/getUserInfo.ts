import { collection, getDocs, CollectionReference } from 'firebase/firestore';
import { firestore } from '@/firebase/firebase.config';
const getAllUsers = async () => {
    const userRef: CollectionReference = collection(firestore, 'users/'),
        result: Object[] = [];

    const res = await (
        await getDocs(userRef)
    ).docs.forEach((doc) => {
        result.push(doc.data());
    });
    return result;
};
const getUserToUid = async (uid: any) => {
    const userRef: CollectionReference = collection(firestore, `users/`);
    const user: Object[] = [];
    const result = await (
        await getDocs(userRef)
    ).docs.forEach((doc) => {
        if (doc.data().uid == uid) {
            user.push(doc.data());
        }
    });
    return user;
};
const getUserAvatar = async (uid: string) => {
    const userRef: CollectionReference = collection(firestore, `users/`);
    const photo: Object[] = [];
    const result = await (
        await getDocs(userRef)
    ).docs.forEach((doc) => {
        if (doc.data().uid == uid) {
            photo.push(doc.data().photoUrl);
        }
    });
    return photo;
};
const getUserName = async (uid: string) => {
    const userRef: CollectionReference = collection(firestore, `users/`);
    const name: Object[] = [];
    const result = await (
        await getDocs(userRef)
    ).docs.forEach((doc) => {
        if (doc.data().uid == uid) {
            name.push(doc.data().name);
        }
    });
    return name;
};
export { getAllUsers, getUserToUid, getUserAvatar, getUserName };
