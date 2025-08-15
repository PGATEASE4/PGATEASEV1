@@ .. @@
   const getRoleColor = (role) => {
     switch (role) {
       case 'admin': return 'bg-purple-100 text-purple-800';
       case 'owner': return 'bg-blue-100 text-blue-800';
       case 'resident': return 'bg-green-100 text-green-800';
+      case 'manager': return 'bg-orange-100 text-orange-800';
       default: return 'bg-gray-100 text-gray-800';
     }
   };
@@ .. @@
                     <SelectItem value="admin">Admin</SelectItem>
                     <SelectItem value="owner">Owner</SelectItem>
+                    <SelectItem value="manager">Manager</SelectItem>
                     <SelectItem value="resident">Resident</SelectItem>
                   </select>
                 </div>