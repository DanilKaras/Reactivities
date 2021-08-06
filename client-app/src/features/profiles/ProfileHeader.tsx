import { observer } from "mobx-react-lite";
import { Button, Divider, Grid, Header, Item, ItemDescription, Reveal, RevealProps, Segment, Statistic } from "semantic-ui-react"
import { Profile } from "../../app/models/profile";
import FollowButton from "./FollowButton";

interface Props{
    profile: Profile | null
}
const ProfileHeader = ({profile}: Props) => {
    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={profile?.image ||  '/assets/user.png'}/>
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' content={profile?.displayName}/>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group width={2}>
                        <Statistic label='Followers' value={profile?.followerCount}></Statistic>
                        <Statistic label='Following' value={profile?.followingCount}></Statistic>
                    </Statistic.Group>
                    <Divider/>
                    <FollowButton profile={profile!}/>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}

export default observer(ProfileHeader);