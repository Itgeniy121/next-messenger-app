import { auth, storage, firestore } from '@/firebase/firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { getUserName } from './getUserInfo';
const uploadNewAvatar = async (file: any, user: any) => {
    const date = new Date().getTime();
    const storageRef = ref(storage, `${date + user.displayName}`);
    await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
                if (auth.currentUser) {
                    await updateProfile(auth.currentUser, {
                        displayName: user.displayName,
                        photoURL: downloadURL,
                    });
                    const photoRef = doc(firestore, `users/${user.uid}`);
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
const updateUserAvatarInOtherChats = async (
    combinedUid: string,
    uid: string,
    avatarUrl: string,
    name: string,
) => {
    const ref = doc(firestore, `usersChats/${uid}`);
    await updateDoc(ref, {
        [combinedUid + '.userInfo']: {
            photoUrl: avatarUrl,
            uid: uid,
            combinedUid: combinedUid,
            name: name,
        },
    });
};

export { uploadNewAvatar, updateUserAvatarInOtherChats };
