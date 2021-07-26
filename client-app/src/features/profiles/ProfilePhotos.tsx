import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Photo, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
interface Props {
    profile: Profile | null
}

const ProfilePhotos = ({ profile }: Props) => {
    const { profileStore: { isCurrentuser, uploadPhoto, 
        uploading, loading, setMainPhoto, deletePhoto } } = useStore();

    const [target, setTarget] = useState('');
    const [addPhotoMode, setAddPhotoMode] = useState(false);

    const handlePhotoUpload = (file: Blob) => {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }
    const handleSetMainPhoto = (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) =>  {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }
    const handleDeletePhoto = (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) =>  {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }


    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='image' content='Photos' />
                    {isCurrentuser && (
                        <Button floated='right' basic content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile?.photos?.map(photo => {
                                return (
                                    <Card key={photo.id}>
                                        <Image src={photo.url} />
                                        {isCurrentuser && (
                                            <Button.Group fluid width={2}>
                                                <Button basic
                                                color='green'
                                                content='Main'
                                                name={'main'+photo.id}
                                                disabled={photo.isMain}
                                                loading={target === 'main'+photo.id && loading}
                                                onClick={e => handleSetMainPhoto(photo,e)} />
                                                <Button
                                                    loading={target === photo.id && loading}
                                                    basic 
                                                    color='red' 
                                                    icon='trash'
                                                    onClick={e=>handleDeletePhoto(photo,e)}
                                                    disabled={photo.isMain}
                                                    name={photo.id}
                                                    />
                                            </Button.Group>
                                        )}
                                    </Card>)
                            })}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
          
        </Tab.Pane>
    )
}

export default observer(ProfilePhotos);