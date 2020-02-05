# User Job Matcher

User Job Matcher is a command line utility that matches users to jobs based on common tags

## Installation

Clone the project

```
git clone https://github.com/ericauv/user-job-matcher.git
```

Navigate to the project directory

```bash
cd user-job-matcher
```

Use the package manager [npm](https://www.npmjs.com/get-npm) to install dependencies.

```
npm install
```

## Usage

After installing, run the utility

```
npm start
```

## Output

The utility will print matches for jobs that had at least 2 tags in common with a user's tags. Example:

```
User 1 matched to {"id":1,"title":"Foo developer","company":"Bar industries","tags":["a","b","c"]}
User 1 matched to {"id":4,"title":"Front-end developer","company":"Bar industries","tags":["a","b","f"]}
User 2 matched to {"id":6,"title":"Chief Technical Officer","company":"Bar industries","tags":["c","e","g"]}
User 3 matched to {"id":3,"title":"Data scientist","company":"Bar industries","tags":["d","e","g"]}
User 3 matched to {"id":8,"title":"Intern","company":"Bar industries","tags":["c","d","f"]}
User 4 matched to {"id":1,"title":"Foo developer","company":"Bar industries","tags":["a","b","c"]}
User 4 matched to {"id":8,"title":"Intern","company":"Bar industries","tags":["c","d","f"]}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
