import express from 'express'
import { getFolders } from './controller'

const router = express.Router()

router.get('/', getFolders)

export default router