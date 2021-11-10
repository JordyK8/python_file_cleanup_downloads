import express from 'express'
import { getFolders } from '../src/controller'

const router = express.Router()

router.get('/', getFolders)

export default router