'use client'

import { useState, useMemo } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import countryList from 'react-select-country-list'
import { Control, Controller, FieldError } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

type CountryFieldProps = {
  name: string
  label: string
  control: Control<any>
  error?: FieldError
  required?: boolean
  placeholder?: string
}

const CountryField = ({ 
  name, 
  label, 
  control, 
  error, 
  required = false,
  placeholder = "Select country..."
}: CountryFieldProps) => {
  const [open, setOpen] = useState(false)
  const countries = useMemo(() => countryList().getData(), [])

  const getCountryFlag = (countryCode: string) => {
    return countryCode
      .toUpperCase()
      .split('')
      .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
      .join('')
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label} {required && <span className="text-red-600">*</span>}
      </Label>
      
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `${label} is required` : false }}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  "w-full justify-between font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? (
                  <span className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full overflow-hidden text-sm">
                      {getCountryFlag(field.value)}
                    </span>
                    {countries.find((country) => country.value === field.value)?.label}
                  </span>
                ) : (
                  placeholder
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Search country..." />
                <CommandList>
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup>
                    {countries.map((country) => (
                      <CommandItem
                        key={country.value}
                        value={country.label}
                        onSelect={() => {
                          field.onChange(country.value)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === country.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span className="flex h-5 w-5 items-center justify-center rounded-full overflow-hidden text-sm mr-2">
                          {getCountryFlag(country.value)}
                        </span>
                        {country.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />
      
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  )
}

export default CountryField