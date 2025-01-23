type PropsJob = {
    jobId: number;
    profileId: number;
}

type PropsDeposit = {
    userId: number;
    depositAmount: number;
    profileId: number;
}

export const getUnpaidJobs = async (profileId: number) => {
    try {
        const response = await fetch('http://localhost:3001/jobs/unpaid', {
            headers: {
                'Content-Type': 'application/json',
                'profile_id': profileId.toString(),
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching UnPaid Jobs', error);
        throw error;
    }
}

export const payForJob = async ({jobId, profileId}: PropsJob) => {
    try {
        const response = await fetch(`http://localhost:3001/jobs/${jobId}/pay`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'profile_id': profileId.toString(),
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching UnPaid Jobs', error);
        throw error;
    }
}

export const postDepositBalance = async ({userId, depositAmount, profileId}: PropsDeposit) => {
    try {
        const response = await fetch(`http://localhost:3001/users/${userId}/deposit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'profile_id': profileId.toString(),
            },
            body: JSON.stringify({ amount: depositAmount }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching UnPaid Jobs', error);
        throw error;
    }
}