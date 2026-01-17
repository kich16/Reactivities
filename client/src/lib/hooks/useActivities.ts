import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../../api/agent";
import { useLocation } from "react-router";

export const useActivities = (id?: string) => {
    const queryCient = useQueryClient();
    const location = useLocation();

    const { data: activities, isLoading } = useQuery({
        queryKey: ["activities"],
        queryFn: async () => {
            const response = await agent.get<Activity[]>("/activities");
            return response.data;
        },
        // will executute the query only qhen we are on the activities page and without a concrete activity id 
        enabled: !id && location.pathname === "/activities"
    });

    const { data: activity, isLoading: isLoadingActivity } = useQuery(
        {
            queryKey: ["activities", id],
            queryFn: async () => {
                const response = await agent.get<Activity>(`/activities/${id}`);
                return response.data;
            },
            enabled: !!id
        }
    )

    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put("/activities", activity);
        },
        onSuccess: async () => {
            console.log("Mutation operation succedded");
            await queryCient.invalidateQueries({
                queryKey: ["activities"]
            });
        }
    })

    const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            const response = await agent.post("/activities", activity);
            return response.data;
        },
        onSuccess: async () => {
            await queryCient.invalidateQueries({
                queryKey: ["activities"]
            })
        }
    })

    const deleteActivity = useMutation({
        mutationFn: async (activityId: string) => {
            await agent.delete(`/activities/${activityId}`);
        },
        onSuccess: async () => {
            await queryCient.invalidateQueries({
                queryKey: ["activities"]
            })
        }

    })

    return {
        activities,
        isLoading,
        updateActivity,
        createActivity,
        deleteActivity,
        activity,
        isLoadingActivity
    };
};