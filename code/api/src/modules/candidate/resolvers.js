// Imports
import isEmpty from 'validator/lib/isEmpty'

// App Imports
import Candidate from './model'

// Query

// Get candidate by ID
export async function get(parentValue, { id }) {
  return await Candidate.findOne({ _id: id })
}

// Get by client
export async function getByClient(parentValue, { clientId }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Candidate.find({
      organizationId: auth.user.organizationId,
      clientId
    })
  } else {
    throw new Error('Please login to view your candidates.')
  }
}

// Get by organization
export async function getByOrganization(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Candidate.find({
      organizationId: auth.user.organizationId
    })
  } else {
    throw new Error('Please login to view your candidates.')
  }
}

// Get by user
export async function getByUser(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id) {
    return await Candidate.find({ userId: auth.user.id })
  } else {
    throw new Error('Please login to view your candidates.')
  }
}

// Get all
export async function getAll() {
  return await Candidate.find()
}


// Mutations

// Create
export async function create(parentValue, { name, email, mobile, experience, resume, salaryCurrent = '', salaryExpected = '' }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Candidate.create({
      organizationId: auth.user.organizationId,
      userId: auth.user.id,
      name,
      email,
      mobile,
      experience,
      resume,
      salaryCurrent,
      salaryExpected
    })
  } else {
    throw new Error('Please login to create candidate.')
  }
}

// Update
export async function update(parentValue, { id, name, email, mobile, experience, resume, salaryCurrent = '', salaryExpected = '' }, { auth }) {
  if(auth.user && auth.user.id && !isEmpty(id)) {
    return await Candidate.updateOne(
      { _id: id },
      {
        $set: {
          name,
          email,
          mobile,
          experience,
          resume,
          salaryCurrent,
          salaryExpected
        }
      }
    )
  } else {
    throw new Error('Please login to update candidate.')
  }
}

// Delete
export async function remove(parentValue, { id }, { auth }) {
  if(auth.user && auth.user.id) {
    return await Candidate.remove({
      _id: _id,
      userId: auth.user.id
    })
  } else {
    throw new Error('Please login to delete candidate.')
  }
}