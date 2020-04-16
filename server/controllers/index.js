'use strict'

module.exports = {
  // Do not remove the System controller!
  System: require('./systemCtrl'),

  // Replace with actual API controller
  Sample: require('./sampleCtrl'),
  RoundAnalysis: require('./roundAnalysisCtrl'),
  Archive: require('./roundArchiveCtrl')
}
