'use strict'

const mongoose = require('mongoose')

const archiveAttachmentSchema = mongoose.Schema({
  fileName: {
    type: String,
    required: [true, 'Element Filnamn. Mappar mot KIP-databas-element "analysisFileName".']
  },
  remarks: {
    type: String,
    required: [true, 'Element Anmarkning. Mappar mot KIP-databas-element "alterationText".']
  },
  fileDate: {
    type: String,
    required: [true, 'Element Expedieringsdatum. Mappar mot KIP-databas-element "pdfAnalysisDate".']
  },
  publishedDate: {
    type: String,
    required: [true, 'Element TidVersion. En tidpunkt (dateTime) för när versionen publicerades. Mappar mot KIP-databas-element "changedAfterPublishedDate", fast på filnivå.']
  }
})

const archiveFragmentSchema = mongoose.Schema({
  courseCode: {
    type: String,
    required: [true, 'Element Kurskod. Mappar mot KIP-databas-element "courseCode".']
  },
  courseName: {
    type: String,
    required: [true, 'Element Kursnamn. Kursbenämning.']
  },
  courseRound: {
    type: String,
    required: [true, 'Element Kurstillfalleskod. Mappar mot KIP-databas-element "_id".']
  },
  semester: {
    type: String,
    required: [true, 'Element Termin. Mappar mot KIP-databas-element "semester".']
  },
  analysisName: {
    type: String,
    required: [true, 'Element Kursomgangomfang. Mappar mot KIP-databas-element "analysisName".']
  },
  responsibles: {
    type: String,
    required: [true, 'Element Kursansvarig. Mappar mot KIP-databas-element "responsibles".']
  },
  examiners: {
    type: String,
    required: [true, 'Element Examinator. Mappar mot KIP-databas-element "examiners".']
  },
  description: {
    type: String,
    default: 'Kursanalys'
  },
  publishedDate: {
    type: String,
    required: [true, 'Element Publiceringsdatum. Som KIP-databas-element publishedDate, men DateTime-format.']
  },
  preserve: {
    type: Number,
    default: 1
  },
  attachments: {
    type: [archiveAttachmentSchema],
    default: []
  },
  exported: {
    type: Boolean,
    default: false
  }
})

const ArchiveFragment = mongoose.model('ArchiveFragment', archiveFragmentSchema)

module.exports = {
  ArchiveFragment: ArchiveFragment,
  schema: archiveFragmentSchema
}
