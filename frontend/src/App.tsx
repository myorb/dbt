import './index.css'
import { ContractDetails } from '@/components/contract-details'
import { GetContracts } from '@/components/get-contracts'
import { BestClients } from '@/components/best-clients'
import { BestProfession } from '@/components/best-profession'
import { GetUnpaidJobs } from '@/components/unpaid-jobs'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { payForJob } from '@/services/jobsService'
import { AddBalance } from './components/add-balance'


function App() {
  const [unpaidJobs, setUnpaidJobs] = useState<any>([])

  const hendelPayClick = async ({jobId, profileId}: {jobId: number, profileId: number}) => {
    const response = await payForJob({jobId, profileId})
    if(response.success){
      setUnpaidJobs(unpaidJobs.filter((job: any) => job.id !== jobId))
    }
  }

  return (
    <main className="flex flex-col gap-4 p-4">
      <h1 className="text-4xl font-bold text-center">Dashboard</h1>
      <div className="flex justify-center">
        <AddBalance />
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-between m-auto">
        <div className="shadow-xl p-6 rounded-lg">
          <GetContracts />
        </div>
        <div className="shadow-xl p-6 rounded-lg">

          <ContractDetails />
        </div>
        <div className="shadow-xl p-6 rounded-lg">

          <BestClients />
        </div>
        <div className="shadow-xl p-6 rounded-lg">

          <BestProfession />
        </div>
        <div className="shadow-xl p-6 rounded-lg">
          <GetUnpaidJobs setUnpaidJobs={setUnpaidJobs} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 border-2 border-gray-200 justify-between m-auto">
        {unpaidJobs.map((job: any, index: number) => (
          <div key={index} className="shadow-lg p-6 rounded-lg">
            <h1 className="text-2xl font-bold">Unpaid {job.description}</h1>
            <ul>
              <li>Price: {job.price} $</li>
              <li>Paid: {job.paid ? 'yes' : 'no'}</li>
              <li>Payment Date: {job.paymentDate}</li>
              <li>ContractId: {job.ContractId}</li>
              <li>Contract Status: {job.Contract.status}</li>
              <li>Contract Terms: {job.Contract.terms}</li>
            </ul>
            <Button onClick={async () => await hendelPayClick({jobId: job.id, profileId: job.Contract.ClientId})}>Pay</Button>
          </div>
        ))}

      </div>
    </main>
  )
}

export default App
