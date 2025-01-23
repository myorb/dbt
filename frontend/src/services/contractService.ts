export const getContracts = async (profileId: number) => {
    try {
        const resp = await fetch('http://localhost:3001/contracts', {
            headers: {
                'Content-Type': 'application/json',
                'profile_id': profileId.toString(),
            },
        });
        return await resp.json();
    } catch (error) {
        console.error('Error fetching contracts', error);
        throw error;
    }
};

type Props = {
    contractId: number;
    profileId: number;
}

export const getContractId = async ({contractId, profileId}: Props) => {
    try {
        const resp = await fetch(`http://localhost:3001/contracts/${contractId}`, {
            headers: {
                'Content-Type': 'application/json',
                'profile_id': profileId.toString(),
            },
        });

        return await resp.json();
    } catch (error) {
        console.error('Error fetching contracts by Id', error);
        throw error;
    }
};

