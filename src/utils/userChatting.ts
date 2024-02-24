import { arrayUnion, Timestamp, updateDoc, setDoc, doc, serverTimestamp } from "firebase/firestore"; 
import { firestore, storage } from "@/firebase/firebase.config";
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {uid} from "uid"
const createChatRoom = async (user: any, currentUser: any) =>{
    if(user !== undefined && currentUser !== undefined){
        const combinedUid = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    try {
    const res = doc(firestore, `chats/${combinedUid}`)
    await setDoc(res, {
        messages: []
    })
    const whereNeedUpdate = doc(firestore, `usersChats/${currentUser.uid}`)
    const whereNeedUpdate2 = doc(firestore, `usersChats/${user.uid}`)
    console.log(currentUser, user)
    if(!currentUser.photoURL && !user.photoUrl){
        await updateDoc(whereNeedUpdate, {
            [combinedUid+".userInfo"]: {
                uid: user.uid,
                name: user.name,
                // photoUrl: user?.photoUrl,
                combinedUid: combinedUid
    
            },
            [combinedUid+".date"]: serverTimestamp()
        })
        await updateDoc(whereNeedUpdate2, {
            [combinedUid+".userInfo"]: {
                uid: currentUser.uid,
                name: currentUser.displayName,
                // photoUrl: currentUser?.photoURL,
                combinedUid: combinedUid
    
            },
            [combinedUid+".date"]: serverTimestamp()
        })
    } else if(currentUser.photoURL && !user.photoUrl){
        await updateDoc(whereNeedUpdate, {
            [combinedUid+".userInfo"]: {
                uid: user.uid,
                name: user.name,
                // photoUrl: user?.photoUrl,
                combinedUid: combinedUid
    
            },
            [combinedUid+".date"]: serverTimestamp()
        })
        await updateDoc(whereNeedUpdate2, {
            [combinedUid+".userInfo"]: {
                uid: currentUser.uid,
                name: currentUser.displayName,
                photoUrl: currentUser?.photoURL,
                combinedUid: combinedUid
    
            },
            [combinedUid+".date"]: serverTimestamp()
        })
    } else if(!currentUser.photoURL && user.photoUrl){
        await updateDoc(whereNeedUpdate, {
            [combinedUid+".userInfo"]: {
                uid: user.uid,
                name: user.name,
                photoUrl: user?.photoUrl,
                combinedUid: combinedUid
    
            },
            [combinedUid+".date"]: serverTimestamp()
        })
        await updateDoc(whereNeedUpdate2, {
            [combinedUid+".userInfo"]: {
                uid: currentUser.uid,
                name: currentUser.displayName,
                // photoUrl: currentUser?.photoURL,
                combinedUid: combinedUid
    
            },
            [combinedUid+".date"]: serverTimestamp()
        })
    } else {
        await updateDoc(whereNeedUpdate, {
            [combinedUid+".userInfo"]: {
                uid: user.uid,
                name: user.name,
                photoUrl: user?.photoUrl,
                combinedUid: combinedUid
    
            },
            [combinedUid+".date"]: serverTimestamp()
        })
        await updateDoc(whereNeedUpdate2, {
            [combinedUid+".userInfo"]: {
                uid: currentUser.uid,
                name: currentUser.displayName,
                photoUrl: currentUser?.photoURL,
                combinedUid: combinedUid
    
            },
            [combinedUid+".date"]: serverTimestamp()
        })
    }
    return combinedUid
} catch (error) {
    console.log(error)
}
    }
}

const sendOnlyTextMessage = async (text: string, params: any, user: any) =>{
    const reference = doc(firestore, `chats/${params.chatId}`)
    const referenceForTheLastMessage = doc(firestore, `usersChats/${user.uid}`)
    let referenceForTheLastMessage2
    if(user.uid == params.chatId.slice(28)){
        referenceForTheLastMessage2 = doc(firestore, `usersChats/${params.chatId.slice(0, 28)}`)
    } else{
        referenceForTheLastMessage2 = doc(firestore, `usersChats/${params.chatId.slice(28)}`)
    }
    try {
        await updateDoc(reference, {
            messages: arrayUnion({
              senderId: user.uid,
              text,
              date: Timestamp.now(),
              uid: uid(16)
            })
          })
          await updateDoc(referenceForTheLastMessage, {
            [params.chatId + ".lastMessage"]:{text},
            [params.chatId+".date"]: serverTimestamp()
          })
          await updateDoc(referenceForTheLastMessage2, {
            [params.chatId + ".lastMessage"]:{text},
            [params.chatId+".date"]: serverTimestamp()
          })
    } catch (error) {
        console.log('Error in sanding Message with text', error)
    }
      
}

const sendTextWithImageMessage = async (text: string, params: any, user: any, img: any) =>{
    const storageRef = ref(storage, uid(16))
    const referenceForTheLastMessage = doc(firestore, `usersChats/${user.uid}`)
    const reference = doc(firestore, `chats/${params.chatId}`)
    await uploadBytesResumable(storageRef, img).then(()=>{
        getDownloadURL(storageRef).then(async(downloadURL) =>{
            let referenceForTheLastMessage2
            if(user.uid == params.chatId.slice(28)){
                referenceForTheLastMessage2 = doc(firestore, `usersChats/${params.chatId.slice(0, 28)}`)
            } else{
                referenceForTheLastMessage2 = doc(firestore, `usersChats/${params.chatId.slice(28)}`)
            }
            try{
                await updateDoc(reference, {
                    messages: arrayUnion({
                      senderId: user.uid,
                      text,
                      date: Timestamp.now(),
                      uid: uid(16),
                      imgUrl: downloadURL
                    })
                  })
                  await updateDoc(referenceForTheLastMessage, {
                    [params.chatId + ".lastMessage"]:{text},
                    [params.chatId+".date"]: serverTimestamp()
                  })
                  await updateDoc(referenceForTheLastMessage2, {
                    [params.chatId + ".lastMessage"]:{text},
                    [params.chatId+".date"]: serverTimestamp()
                  })
            }catch(e){
                console.log("Error in sending message with image", e)
            }
        })
    })
}

export {createChatRoom, sendOnlyTextMessage, sendTextWithImageMessage}