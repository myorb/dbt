type Props = {
    userId: number;
    depositAmount: number;
    profileId: number;
}

export const addDeposit = async ({userId, depositAmount, profileId}: Props) => {
    try {
        const resp = await fetch(`http://localhost:3001/balances/deposit/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'profile_id': `${profileId}`,
            },
            body: JSON.stringify({ amount: depositAmount }),
        });
        return await resp.json();
    } catch (error) {
        console.error('Error depositing balance', error);
        throw error;
    }
}

