import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { UserSearchParams, UserType } from "@/types/users/userSearchParams";
import { RotateCcw, Search } from "lucide-react";
import { useState, type FormEvent } from "react";

interface UserSearchProps {
  onSearch: (filters: UserSearchParams) => void;
  isLoading: boolean
}

const initialFilters: UserSearchParams = {
  name: '',
  lastname: '',
  email: '',
  type: undefined,
  deletedUsers: false,
};

export function UserSearchFilter({ onSearch, isLoading }: UserSearchProps) {
  const [filters, setFilters] = useState<UserSearchParams>(initialFilters);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.id]: e.target.value,
    });
  };

  const handleSelectChange = (value: UserType | 'ALL') => {
    setFilters({
      ...filters,
      type: value === 'ALL' ? undefined : value,
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFilters({
      ...filters,
      deletedUsers: checked,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const cleanFilters: UserSearchParams = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== '' && value !== undefined && value !== null) {
        if (typeof value === 'boolean' || (typeof value === 'string' && value.trim() !== '') || key === 'type') {
            (acc as any)[key] = value;
        }
      }
      return acc;
    }, {} as UserSearchParams);

    onSearch(cleanFilters);
  };
  
  const handleReset = () => {
    setFilters(initialFilters);
    onSearch({});
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-card rounded-lg shadow-sm border space-y-4">
      <h3 className="text-lg font-semibold flex items-center">
        <Search className="h-5 w-5 mr-2 text-primary" /> Filtros de Búsqueda
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="space-y-1">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" type="text" value={filters.name || ''} onChange={handleInputChange} placeholder="Buscar por nombre" />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="lastname">Apellido</Label>
          <Input id="lastname" type="text" value={filters.lastname || ''} onChange={handleInputChange} placeholder="Buscar por apellido" />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={filters.email || ''} onChange={handleInputChange} placeholder="Buscar por email" />
        </div>

        <div className="space-y-1">
          <Label htmlFor='type'>Tipo</Label>
          <Select 
            value={filters.type || 'ALL'} 
            onValueChange={handleSelectChange}
            name="type"
          > 
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Todos los tipos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos los Tipos</SelectItem>
              <SelectItem value="USER">Usuario Estándar</SelectItem>
              <SelectItem value="CUSTOMER">Cliente</SelectItem>
              <SelectItem value="ADMIN">Administrador</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between pt-2">
        
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <Checkbox 
            id="includeDeleted" 
            checked={filters.deletedUsers} 
            onCheckedChange={handleCheckboxChange as (checked: boolean) => void}
          />
          <Label htmlFor="deletedUsers" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Ver usuarios eliminados
          </Label>
        </div>

        <div className="flex space-x-2">
          <Button type="button" variant="outline" onClick={handleReset} disabled={isLoading}>
            <RotateCcw className="h-4 w-4 mr-2" /> Resetear
          </Button>
          <Button type="submit" disabled={isLoading}>
            <Search className="h-4 w-4 mr-2" /> Buscar
          </Button>
        </div>
      </div>
    </form>
  );
}