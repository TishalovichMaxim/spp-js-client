type ProfilePageProps = {
    login: string,
    userId: number,
}

function ProfilePage(props: ProfilePageProps) {
    return <>
        <div>
            User:
        </div>
        <div>
            {props.login}
        </div>
        <button
            onClick={}
        >
            Logout
        </button>
    </>
}

export { ProfilePage }

