'use client'

import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'

const InputField = ({ name, label, register, type = 'text', error, placeholder, validation, disabled, value } : FormInputProps) => {
  return (
    <div className='space-y-2'>
        <Label htmlFor={name} className='form-label'>
            {label}
        </Label>
        <Input 
            type={type}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            className={cn('form-input', {'opacity-50 cursor-not-allowed': disabled})}
            {...register(name, validation)}
        />

        {error && <p className='text-sm text-red-600'>{error.message}</p>}
    </div>
  )
}

export default InputField