import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const OrderForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');

  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const handleSubmit = () => {};

  return (
    <div style={{ width: '60%' }} className="m-auto">
      <Form onSubmit={validate(handleSubmit)}>
        <Form.Group className="mb-4">
          <Form.Label>First name</Form.Label>
          <Form.Control
            {...register('firstName', {
              required: 'First name is required.',
              minLength: {
                value: 3,
                message: 'First name is too short (min is 3).',
              },
              maxLength: {
                value: 30,
                message: 'First name is too long (max is 30).',
              },
            })}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            isInvalid={errors.firstName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            {...register('lastName', {
              required: 'Last name is required.',
              minLength: {
                value: 3,
                message: 'Last name is too short (min is 3).',
              },
              maxLength: {
                value: 30,
                message: 'Last name is too long (max is 30).',
              },
            })}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            isInvalid={errors.lastName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: 'Invalid email format.',
              },
            })}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Country or region</Form.Label>
          <Form.Control
            {...register('country', { required: 'Country is required.' })}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            isInvalid={errors.country}
          />
          <Form.Control.Feedback type="invalid">
            {errors.country?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Street address</Form.Label>
          <Form.Control
            {...register('street1', {
              required: 'Street address is required.',
            })}
            value={street1}
            onChange={(e) => setStreet1(e.target.value)}
            isInvalid={errors.street1}
          />
          <Form.Control
            {...register('street2')}
            value={street2}
            onChange={(e) => setStreet2(e.target.value)}
            placeholder="Street address 2 (optional)"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>City</Form.Label>
          <Form.Control
            {...register('city', { required: 'City is required.' })}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            isInvalid={errors.city}
          />
          <Form.Control.Feedback type="invalid">
            {errors.city?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>ZIP code</Form.Label>
          <Form.Control
            {...register('zip', {
              required: 'ZIP code is required.',
              pattern: {
                value: /^(\d{2}-\d{3}|\d{5})$/,
                message:
                  'Invalid ZIP code format. Expected format: XX-XXX or XXXXX.',
              },
            })}
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            isInvalid={errors.zip}
          />
          <Form.Control.Feedback type="invalid">
            {errors.zip?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            {...register('phone', {
              required: 'Phone number is required.',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Invalid phone number.',
              },
            })}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            isInvalid={errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            as="textarea"
            {...register('comments')}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Order
        </Button>
      </Form>
    </div>
  );
};

export default OrderForm;
