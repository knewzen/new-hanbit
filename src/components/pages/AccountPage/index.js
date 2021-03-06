// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  Header,
  SignupForm,
  SigninForm,
  FormSteps,
  Signup2Form,
  Signup3Form,
} from 'containers'
import { PageTemplate } from 'components'

const formWidth = 30

const Wrapper = styled.div`
  .form-steps {
    max-width: ${formWidth}em;
    margin: 0.5em auto 2em auto;
  }
`

const AccountPage = ({
  loginView,
  changeView,
  current,
  endStep,
}) => {
  return (
    <PageTemplate header={<Header />} padding={'0 2em'}>
      {
        loginView ? (
          <Wrapper>
            <SigninForm
              formWidth={formWidth}
              changeView={changeView}
            />
          </Wrapper>
        ) : (
          <Wrapper>
            <FormSteps />
            {
              current === 0 &&
                <SignupForm
                  formWidth={formWidth}
                  changeView={changeView}
                  endStep={endStep}
                />
            }
            {
              current === 1 &&
                <Signup2Form
                  formWidth={formWidth}
                  endStep={endStep}
                />
            }
            {
              current > 1 &&
                <Signup3Form
                  formWidth={formWidth}
                  endStep={endStep}
                />
            }
          </Wrapper>
        )
      }
    </PageTemplate>
  )
}

AccountPage.propTypes = {
  loginView: PropTypes.bool,
  changeView: PropTypes.func,
  current: PropTypes.number,
  endStep: PropTypes.func,
}

export default AccountPage
