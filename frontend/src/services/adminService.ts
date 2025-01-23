type Props = {
    startDate: Date;
    endDate: Date;
    limit: number;
}

export const getBestProfession = async ({startDate, endDate, limit }:Props) => {
    try {
        const response = await fetch(`http://localhost:3001/admin/best-profession?start=${startDate}&end=${endDate}&limit=${limit}`,{
            headers: {
                'Content-Type': 'application/json',
                'profile_id': 'admin',
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching best professions', error);
        throw error;
    }
};

export const getBestClients = async ({startDate, endDate, limit }:Props) => {
    try {
        const response = await fetch(`http://localhost:3001/admin/best-clients?start=${startDate}&end=${endDate}&limit=${limit}`,{
            headers: {
                'Content-Type': 'application/json',
                'profile_id': 'admin',
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching best clients', error);
        throw error;
    }
}

