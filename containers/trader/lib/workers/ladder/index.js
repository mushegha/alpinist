function evaluate (job) {
  console.log(job.data)

  return new Promise(res => setTimeout(res, 1000))
}

module.exports = evaluate
