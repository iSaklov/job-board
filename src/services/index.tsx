import Airtable, { FieldSet, Records } from 'airtable'
import { JobData } from '@/types'

const base = new Airtable({
	apiKey: process.env.AIRTABLE_API_TOKEN,
}).base('apppdMhxrrjOOq3Gm')

let jobs: null | Records<FieldSet> = null

export default async function getJobs(): Promise<Records<FieldSet>> {
	return new Promise((resolve, reject) => {
		base('tblH6cgCp08ewbIKs')
			.select({
				// Selecting the first 3 records in Grid view:
				view: 'Grid view',
			})
			.all(function page(err, records) {
				if (err) reject(err)

				if (!records) {
					reject('No records found')

					return
				}

				// save the fetches records in a local variable
				// will be useful later
				jobs = records

				resolve(records)
			})
	})
}

export async function getJob(id: string) {
	if (!jobs) {
		await getJobs()
	}

	const job = jobs?.find((job: JobData) => job.id === id)

	return job
}
