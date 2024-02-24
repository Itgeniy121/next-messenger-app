import { auth, storage, firestore } from '@/firebase/firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

const uploadProfilePhoto = async (file: any, name: string, uid: any) => {
    const date = new Date().getTime();
    const storageRef = ref(storage, `${date + name}`);
    await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
                if (auth.currentUser) {
                    await updateProfile(auth.currentUser, {
                        displayName: name,
                        photoURL: downloadURL,
                    });
                    const photoRef = doc(firestore, `users/${uid}`);
                    await updateDoc(photoRef, {
                        photoUrl: downloadURL,
                    });
                }
            } catch (e) {
                console.log(e);
            }
        });
    });
};

export { uploadProfilePhoto };
