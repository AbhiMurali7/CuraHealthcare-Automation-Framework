export const credentials = {
  validUser:    { username: 'John Doe',   password: 'ThisIsNotAPassword' },
  invalidPass:  { username: 'John Doe',   password: 'WrongPassword' },
  invalidUser:  { username: 'wrong_user', password: 'ThisIsNotAPassword' },
  bothInvalid:  { username: 'wrong_user', password: 'wrong_pass' },
  emptyBoth:    { username: '',           password: '' },
  emptyPass:    { username: 'John Doe',   password: '' },
  emptyUser:    { username: '',           password: 'ThisIsNotAPassword' },
};

export const appointmentData = {
  facility: [
    'Tokyo CURA Healthcare Center',
    'Hongkong CURA Healthcare Center',
    'Seoul CURA Healthcare Center',
  ],
  program: ['Medicare', 'Medicaid', 'None'],
  validDate:   '01/04/2026',  // dd/mm/yyyy — future date
  pastDate:    '01/01/2020',  // past date — site accepts it anyway
  invalidDate: 'abc',         // non-date string — setDate() won't set internal state
  comment:     'Test comment',
};
