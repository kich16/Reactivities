import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useState } from "react"
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const { activities, isLoading } = useActivities();

  const handleSelectActivity = (id: string) => {
    const activity = activities!.find(a => a.id === id);
    setSelectedActivity(activity);
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) {
      handleSelectActivity(id);
    }
    else {
      handleCancelSelectActivity();
    }
    setEditMode(true);
  }
  const handleCloseForm = () => {
    setEditMode(false);
  }

  return (
    <Box sx={{ backgroundColor: '#eeeeee' }}>
      <CssBaseline />
      <NavBar
        openForm={handleOpenForm} />

      <Container maxWidth='xl' sx={{ mt: 3, minHeight: "100vh" }}>
        {!activities || isLoading ?
          <Typography>Loading...</Typography> :
          <ActivityDashboard
            activities={activities}
            selectedActivity={selectedActivity}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            editMode={editMode}
            closeForm={handleCloseForm}
            openForm={handleOpenForm} />
        }
      </Container>
    </Box>
  )
}

export default App
