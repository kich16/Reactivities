import { Grid2 } from "@mui/material"
import ActivityList from "./ActivityList"
import ActivityDetails from "../details/ActivityDetails"
import ActivityForm from "../form/ActivityForm"

type Props = {
    activities: Activity[]
    selectedActivity?: Activity
    selectActivity: (id: string) => void
    cancelSelectActivity: () => void
    editMode: boolean
    closeForm: () => void
    openForm: (id: string) => void
}

export default function ActivityDashboard({
    activities,
    selectedActivity,
    selectActivity,
    cancelSelectActivity,
    editMode,
    closeForm,
    openForm }: Props) {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity} />
            </Grid2>
            <Grid2 size={5}>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        selectedActivity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />}

                {editMode &&
                    <ActivityForm
                        closeForm={closeForm}
                        activity={selectedActivity} />}
            </Grid2>
        </Grid2>
    )
}
